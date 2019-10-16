import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';


describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let mockHeroService;
  beforeEach(async(() => {
    mockHeroService = jasmine.createSpyObj(['searchHeroes']);
    TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the searchHero method of heroService when search is called', fakeAsync(() => {
    mockHeroService.searchHeroes.and.returnValue(of([{ id: 11, name: 'Dr Nice' }]));
    const name = 'Dr Ni';
    fixture.componentInstance.search(name);
    tick(300);
    expect(mockHeroService.searchHeroes).toHaveBeenCalledWith(name);
  }));

  it('should display search hero(es) when search is called and match is found', fakeAsync(() => {
    mockHeroService.searchHeroes.and.returnValue(of([{ id: 11, name: 'Dr Nice' }]));
    const name = 'Dr Ni';
    fixture.componentInstance.search(name);
    tick(300);
    fixture.detectChanges();
    let anchors = fixture.debugElement.queryAll(By.css('a'));
    expect(anchors.length).toBe(1);
    expect(anchors[0].nativeElement.textContent.trim()).toEqual('Dr Nice');
  }));

  it('should display no heroes when search is called and no match is found', fakeAsync(() => {
    mockHeroService.searchHeroes.and.returnValue(of([]));
    const name = 'Dr Ni';
    fixture.componentInstance.search(name);
    tick(300);
    fixture.detectChanges();
    let anchors = fixture.debugElement.queryAll(By.css('a'));
    expect(anchors.length).toBe(0);
  }));
});
