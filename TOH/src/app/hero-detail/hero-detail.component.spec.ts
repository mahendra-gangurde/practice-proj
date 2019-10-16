import { HeroDetailComponent } from "./hero-detail.component";
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fx: ComponentFixture<HeroDetailComponent>;
  let fakeActivateRoute = {
    snapshot: { paramMap: { get: () => { return '11' } } }
  };

  let fakeLocation, fakeHeroService;

  beforeEach(() => {
    fakeLocation = jasmine.createSpyObj(['back']);
    fakeHeroService = jasmine.createSpyObj(['getHero', 'updateHero'])
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivateRoute },
        { provide: Location, useValue: fakeLocation },
        { provide: HeroService, useValue: fakeHeroService }

      ],
      // schemas: [NO_ERRORS_SCHEMA]
    })
    fx = TestBed.createComponent(HeroDetailComponent);
  })

  it('should be created', () => {
    component = fx.componentInstance;
    expect(component).toBeTruthy();
  })

  it('should get the the first hero', () => {
    const hero = { id: 11, name: 'Dr Nice' };
    fakeHeroService.getHero.and.returnValue(of(hero))
    fx.detectChanges();
    expect(fx.componentInstance.hero).toBe(hero);
  })

  it('should display hero name in h2', () => {
    const hero = { id: 11, name: 'Dr Nice' };
    fakeHeroService.getHero.and.returnValue(of(hero))
    fx.detectChanges();
    expect(fx.nativeElement.querySelector('h2').textContent).toContain('DR NICE');
  })

  it('should call the getHero of heroService', () => {
    const hero = { id: 11, name: 'Dr Nice' };
    fakeHeroService.getHero.and.returnValue(of(hero))
    fx.detectChanges();
    expect(fakeHeroService.getHero).toHaveBeenCalledWith(11);
  })

  it('should call the updateHero of heroService when save clicked (debugElement - triggerEventHandler)', () => {
    const hero = { id: 11, name: 'Dr Nice' };

    fakeHeroService.getHero.and.returnValue(of(hero))
    fakeHeroService.updateHero.and.returnValue(of(true));
    fx.detectChanges();

    fx.componentInstance.hero.name = 'Dr Nicest';

    let deB = fx.debugElement.queryAll(By.css('button'));
    deB[1].triggerEventHandler('click', {});
    expect(fakeHeroService.updateHero).toHaveBeenCalledWith({ ...hero, name: 'Dr Nicest' });
  })

  it('should call the updateHero of heroService when save clicked (nativeElement - click)', () => {
    const hero = { id: 11, name: 'Dr Nice' };

    fakeHeroService.getHero.and.returnValue(of(hero))
    fakeHeroService.updateHero.and.returnValue(of(true));
    fx.detectChanges();

    fx.componentInstance.hero.name = 'Dr Nicest';
    const btns = fx.nativeElement.querySelectorAll('button');
    expect(btns[0].textContent).toBe('go back');
    expect(btns[1].textContent).toBe('save');

    btns[1].click();
    expect(fakeHeroService.updateHero).toHaveBeenCalledWith({ ...hero, name: 'Dr Nicest' });
  })
})
