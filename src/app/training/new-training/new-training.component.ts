import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.exercises = this.db.collection('availableExercises').snapshotChanges()
      .pipe(
        map(
          docArray => {
            return docArray.map(
              doc => {
                return {
                  id: doc.payload.doc.id,
                  ...doc.payload.doc.data()
                };
              }
            );
          }
        )
      );
  }

  onStartTraining(form: NgForm) {
    console.log('Starting training');
    this.trainingService.startExercise(form.value.exercise);
  }

}
