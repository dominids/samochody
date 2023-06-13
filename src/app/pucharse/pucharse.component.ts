import { Component, Input } from '@angular/core';
import { CarService } from '../car.service';
import { Car } from '../car';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pucharse',
  templateUrl: './pucharse.component.html',
  styleUrls: ['./pucharse.component.css']
})
export class PucharseComponent {
  @Input() car?: Car;
  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private location: Location,
  ) { }
  date_now = "";
  date_then = "";

  price: number = 0;
  date2="";
  payment2="";
  adress2="";
  addons = [
    { id: 0, name: '', price: '' },
    {},
    {}
  ]
  date = new Date();
  s1 = 'false';
  s2 = 'false';
  s3 = 'false';

  symbol1 = "+";
  symbol2 = "+";
  symbol3 = "+";
  submitted = false;

  savedFormValues: string | null = localStorage.getItem('carFormValues');
  onSubmit() {
    this.submitted = true;
    this.savedFormValues = localStorage.getItem('carFormValues');
    if(this.savedFormValues){
      this.date2 = JSON.parse(this.savedFormValues).delivery_date;
      this.payment2 = JSON.parse(this.savedFormValues).payment;
      this.adress2 = JSON.parse(this.savedFormValues).deliveryAdress;
    }
    localStorage.clear();
  }

  ngOnInit(): void {
    this.getCar();
    this.date_now = this.formatDate(new Date());
    this.date.setDate(this.date.getDate() + 14);
    this.date_then = this.formatDate(this.date);
    console.log(this.date_then);
    console.log(this.date_now);
    if (this.savedFormValues !== null) {
      this.carForm.setValue(JSON.parse(this.savedFormValues));
    }
    this.carForm.valueChanges.subscribe(() => {
      this.onFormChange();
    });

    if (localStorage.getItem('acc0') !== null) {
      this.s1 = localStorage.getItem('acc0') as string;
      this.display(0);
    }

    if (localStorage.getItem('acc1') !== null) {
      this.s2 = localStorage.getItem('acc1') as string;
      this.display(1);
    }

    if (localStorage.getItem('acc2') !== null) {
      this.s3 = localStorage.getItem('acc2') as string;
      this.display(2);
    }
  }
  onFormChange(): void {
    localStorage.setItem('carFormValues', JSON.stringify(this.carForm.value));
  }

  display(id: number): void {
    this.onFormChange();
    if (id == 0) {
      if (this.s1 == 'false') {
        this.addons[0] = { id: 0, name: 'winter tyres', price: '2000zł' };
        this.symbol1 = "-";
        this.s1 = 'true';
        this.price += 2000;
        localStorage.setItem('acc0', 'false');

      }
      else {
        this.addons[0] = {};
        this.s1 = 'false';
        this.price -= 2000;
        this.symbol1 = "+";
        localStorage.setItem('acc0', 'true');
      }
    }
    if (id == 1) {
      if (this.s2 == 'false') {
        this.addons[1] = { id: 1, name: 'fragrance pendant', price: '5zł' };
        this.symbol2 = "-";
        this.s2 = 'true';
        this.price += 5;
        localStorage.setItem('acc1', 'false');
      }
      else {
        this.addons[1] = {};
        this.s2 = 'false';
        this.price -= 5;
        this.symbol2 = "+";
        localStorage.setItem('acc1', 'true');
      }
    }
    if (id == 2) {
      if (this.s3 == 'false') {
        this.addons[2] = { id: 2, name: 'an additional year of warranty', price: '5000zł' };
        this.symbol3 = "-";
        this.s3 = 'true';
        this.price += 5000;
        localStorage.setItem('acc2', 'false');

      }
      else {
        this.addons[2] = {};
        this.s3 = 'false';
        this.symbol3 = "+";
        this.price -= 5000;
        localStorage.setItem('acc2', 'true');
      }
    }
  }


  //date
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  //date
  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-')
    );
  }

  getCar(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.carService.getCar(id).subscribe(car => {
      this.car = car;
      this.price = parseInt(car.price);
    })
  }

  goBack(): void {
    this.location.back();
  }
  nameAndLastNamePatternValidator = Validators.pattern('^[A-Za-z]+ [A-Za-z]+$');
  carForm = new FormGroup({
    surname: new FormControl('', [Validators.required, this.nameAndLastNamePatternValidator]),
    deliveryAdress: new FormControl('', [Validators.required]),
    delivery_date: new FormControl('', [Validators.required]),
    payment: new FormControl('', [Validators.required]),
  })


  get deliveryAdress() {
    return this.carForm.get('deliveryAdress');
  }

  get surname() {
    return this.carForm.get('surname');
  }

  get delivery_date() {
    return this.carForm.get('delivery_date');
  }

  get payment() {
    return this.carForm.get('payment');
  }
}//this.price = document.getElementById("price")!.innerText;

function dateRangeValidator(arg0: string, arg1: string): import("@angular/forms").ValidatorFn {
  throw new Error('Function not implemented.');
}

