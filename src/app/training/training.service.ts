import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  availableExercise: Exercise[] = [];
  // Emit an event whenever receive esercises
  exercisesChanged = new Subject<Exercise[]>();

  private runningExercise: Exercise;

  exerciseChanged = new Subject<Exercise>();

  exercises: Exercise[] = [];


  constructor(
    private db: AngularFirestore
  ) { }

  fetchAvailableExercise() {
    this.db.collection('availableExercises').snapshotChanges()
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
      )
      .subscribe(
        (exercises: Exercise[]) => {
          this.availableExercise = exercises;
          this.exercisesChanged.next([...this.availableExercise]);
        }
      );
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercise.find(
      (exercise) => exercise.id === selectedId
    );
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.exercises.push(
      {
        ...this.runningExercise,
        date: new Date(),
        state: 'completed'
      }
    );
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push(
      {
        ...this.runningExercise,
        date: new Date(),
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        state: 'cancelled'
      }
    );
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise(): Exercise {
    return { ...this.runningExercise };
  }

  getCompletedOrCanceledEsercises() {
    return this.exercises.slice();
  }

}
