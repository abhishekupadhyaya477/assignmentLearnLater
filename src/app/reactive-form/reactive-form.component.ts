import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {
  userRegistrationForm: any = '';
  maxDate: Date = new Date();

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userRegistrationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      dateOfBirth: new FormControl('', Validators.required),
      age: new FormControl({ value: '', disabled: true }),
      hobbies: new FormArray([], Validators.required)
    });
    this.addHobby()
    this.userRegistrationForm.get('dateOfBirth').valueChanges.subscribe((value: Date) => {
      if (value) {
        const age = this.calculateAge(new Date(value));
        this.userRegistrationForm.get('age').setValue(age);
      }
    });
  }

  //method for calculating age from DOB
  calculateAge(birthday: Date): number {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  //method for adding a new hobby
  addHobby() {
    if (this.hobbies.length > 0) {
      this.hobbies.push(new FormControl(''));
    } else {
      this.hobbies.push(new FormControl('',Validators.required));
    }
  }

  //method for removing a hobby
  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  //method which will be called while clicking on save button and the values will be manipulated according to need
  onSave() {
    console.log(this.userRegistrationForm.value);
    this._snackBar.open(`Hi ${this.userRegistrationForm.firstName}, data logged succesfully on the console`, 'Close');
  }

  //getter for the hobbies form array
  get hobbies(): FormArray {
    return this.userRegistrationForm.get('hobbies') as FormArray;
  }

}

