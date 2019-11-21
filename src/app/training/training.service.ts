import { UiService } from './../shared/ui.service';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private COLLECTION_NAME = 'finishedExercises';

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercise: Exercise[] = [];
  private runningExercise: Exercise;
  private firebaseSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UiService
  ) { }

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.firebaseSubscriptions.push(
      this.db.collection('availableExercises').snapshotChanges()
        .pipe(
          map(
            docArray => {
              return docArray.map(
                doc => {
                  // throw(new Error());
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
            this.uiService.loadingStateChanged.next(false);
            this.availableExercise = exercises;
            this.exercisesChanged.next([...this.availableExercise]);
          },
          error => {
            // console.log(error);
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar('Fetching exercises failed', null, 3000);
            this.exercisesChanged.next(null);
          }
        )
    );
  }

  startExercise(selectedId: string) {
    // this.db.doc( 'availableExercises' + selectedId, { lastSelected: new Date() } );
    this.runningExercise = this.availableExercise.find(
      (exercise) => exercise.id === selectedId
    );
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.addDataToDatabase(
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
    this.addDataToDatabase(
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

  fetchCompletedOrCanceledEsercises() {
    this.firebaseSubscriptions.push(
      this.db.collection(this.COLLECTION_NAME).valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises);
          },
          error => {
            console.log(error);
          }
        )
    );
  }

  cancelSubscriptions() {
    this.firebaseSubscriptions.forEach(
      subscription => subscription.unsubscribe()
    );
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection(this.COLLECTION_NAME).add(exercise);
  }

}
