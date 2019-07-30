import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  avalableExercise: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  private runningExercise: Exercise;

  exerciseChanged = new Subject<Exercise>();

  constructor() { }

  getAvalableExercise(): Exercise[] {
    return this.avalableExercise.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.avalableExercise.find(
      (exercise) => exercise.id === selectedId
    );
    this.exerciseChanged.next({...this.runningExercise});
  }

}