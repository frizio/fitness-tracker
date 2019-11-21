import { UiService } from './../../shared/ui.service';
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

  isLoading = false;
  loadingSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => this.isLoading = isLoading
    );
    this.exercisesSubscription = this.trainingService.exercisesChanged
      .subscribe( exercises => this.exercises = exercises );
    this.trainingService.fetchAvailableExercise();
  }

  ngOnDestroy() {
    this.exercisesSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    console.log('Starting training');
    this.trainingService.startExercise(form.value.exercise);
  }

}
