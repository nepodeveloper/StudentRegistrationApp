import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/shared/student.service';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(public service: StudentService, public firestore: AngularFirestore,
    public toastr: ToastrService ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form != null)
     form.resetForm();
    this.service.formData = {
      id: null,
      classRoomName: '',
      grade: '',
      date: '',
      time: '',
      studentName: ''
    }
  }

  onSubmit(form:NgForm){
    let data = Object.assign({}, form.value);
    if (form.value.id == null)
      this.firestore.collection('students').add(data);
    else
    this.resetForm(form);
    this.firestore.doc('students/' + form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted successfully', 'Student Register');
  }

}
