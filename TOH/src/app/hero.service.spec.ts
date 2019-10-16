import { TestBed } from "@angular/core/testing";
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('HeroService', () => {

  let httpTestingController: HttpTestingController;
  let heroSvc: HeroService;

  const getHeroTestUrl = 'api/heroes/11';
  const getHeroData = { id: 11, name: 'Dr Nice' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HeroService,
        //MessageService
      ]
    })

    httpTestingController = TestBed.get(HttpTestingController);
    heroSvc = TestBed.get(HeroService);
  });

  it('should be created', () => {
    expect(heroSvc).toBeTruthy();
  })

  it('should call a http get method', () => {
    heroSvc.getHero(11).subscribe();

    const req = httpTestingController.expectOne(getHeroTestUrl);

    expect(req.request.method).toEqual('GET');

    httpTestingController.verify();
  })

  it('should call get with correct URL', () => {

    heroSvc.getHero(11).subscribe(data => console.log('received response', data));

    let req = httpTestingController.expectOne(getHeroTestUrl);

    req.flush(getHeroData);

    httpTestingController.verify();
  })

  it('should call a http get method and return a success', () => {
    heroSvc.getHero(11).subscribe(
      data => {
        expect(data).toBe(getHeroData);
      },
      error => {
        expect(error).toBeFalsy();
      }
    );

    const req = httpTestingController.expectOne(getHeroTestUrl);

    req.flush(getHeroData);

    httpTestingController.verify();
  })

  xit('should catch failed request errors', () => {
    let errorResp;
    heroSvc.getHero(11).subscribe(
      data => console.log('call was not expected here', data),
      (error) => errorResp = error
    );

    const mockError = new ErrorEvent('Network error', {
      message: 'failed request',
    });

    const req = httpTestingController.expectOne(getHeroTestUrl)
      .error(mockError);

    expect(errorResp).toBeTruthy();
  })
})
