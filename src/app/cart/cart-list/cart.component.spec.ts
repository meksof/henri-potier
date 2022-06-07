import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartListComponent } from './cart-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('CartListComponent', () =>
{
    let component: CartListComponent;
    let fixture: ComponentFixture<CartListComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [CartListComponent, CartListComponent],
            imports: [
                HttpClientModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(CartListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });


});
