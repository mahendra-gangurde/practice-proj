import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { By } from '@angular/platform-browser';
import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {

  @Input('routerLink') routeParam;
  navigatedTo = null;

  // @HostListener('click') onClick() {
  //   console.log('click event', this.routeParam);
  //   this.navigatedTo = this.routeParam;
  // }

  onClick() {
    console.log('click event', this.routeParam);
    this.navigatedTo = this.routeParam;
  }
}

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  const heroes = [{ id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' }];

  beforeEach(async(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule({
      imports: [],
      declarations: [HeroesComponent, RouterLinkDirectiveStub],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  }));


  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHeroes', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    expect(mockHeroService.getHeroes).toHaveBeenCalled();
  })

  it('should call getHeroes and display heroes list', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    const liElements = fixture.debugElement.queryAll(By.css('li'));
    expect(liElements.length).toBe(4);
    expect(liElements[0].nativeElement.textContent).toContain(heroes[0].name);
  })

  it('should delete hero from the list on delete button click', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    const li = fixture.debugElement.queryAll(By.css('li'));
    expect(li.length).toBe(4);
    mockHeroService.deleteHero.and.returnValue(of(true));

    let deleteButtons = fixture.debugElement.queryAll(By.css('.delete'));
    console.log('deleteButtons', deleteButtons);
    deleteButtons[2].triggerEventHandler('click', {});

    fixture.detectChanges();

    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]);
    const liElements = fixture.debugElement.queryAll(By.css('li'));
    expect(liElements.length).toBe(3);
    expect(liElements[2].nativeElement.textContent).toContain(heroes[3].name);
  })

  it('should add new hero to the list on add button click', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    mockHeroService.addHero.and.returnValue(of({ id: 6, name: 'Shaktiman' }));

    const input = fixture.debugElement.query(By.css('#nameTxt')).nativeElement;
    input.value = 'Shaktiman';

    let button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(mockHeroService.addHero).toHaveBeenCalledWith({ name: 'Shaktiman' });
    const liElements = fixture.debugElement.queryAll(By.css('li'));
    expect(liElements.length).toBe(5);
    expect(liElements[4].nativeElement.textContent).toContain('Shaktiman');
  });

  it('should have correct routerlink for 2nd hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    const anchors = fixture.debugElement.queryAll(By.css('li'));
    let routerLink = anchors[1]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    anchors[1].query(By.css('a')).triggerEventHandler('click', { button: 0 });

    fixture.detectChanges();

    expect(routerLink.navigatedTo).toBe('/detail/12');
  })

});
