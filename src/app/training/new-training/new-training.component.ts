import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[];
  exercisesSubscription: Subscription;

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.exercisesSubscription = this.trainingService.exercisesChanged
      .subscribe( exercises => this.exercises = exercises );
    this.trainingService.fetchAvailableExercise();
  }

  ngOnDestroy() {
    this.exercisesSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    console.log('Starting training');
    this.trainingService.startExercise(form.value.exercise);
  }

}
