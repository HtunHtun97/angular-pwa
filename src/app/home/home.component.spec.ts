import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let h1: HTMLElement;

  describe('Two beforeEach', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent]
      }).compileComponents(); // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance; // HomeComponent test instance
      h1 = fixture.nativeElement.querySelector('h1');
    });

    tests();
  });

  describe('One beforeEach', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(HomeComponent);
          component = fixture.componentInstance;
          h1 = fixture.nativeElement.querySelector('h1');
        });
    }));

    tests();
  });

  function tests() {
    it('no title in the DOM until manually call `detectChanges`', () => {
      expect(h1.textContent).toEqual('');
    });

    it('should display original title', () => {
      fixture.detectChanges();
      expect(h1.textContent).toContain(component.title);
    });

    it('should display a different test title', () => {
      component.title = 'Test Title';
      fixture.detectChanges();
      expect(h1.textContent).toContain('Test Title');
    });
  }
});
