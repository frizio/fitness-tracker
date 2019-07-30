import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output()
  startTraining = new EventEmitter<void>();

  exercises: Exercise[] = [];

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.exercises = this.trainingService.getAvalableExercise();
  }

  onStartTraining() {
    console.log('Starting training');
    this.startTraining.emit();
  }

}
