import { TrainingRoutingModule } from './training-routing.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SharedModule } from './../shared/shared.module';


import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { TrainingComponent } from './training.component';

import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    AngularFirestoreModule,
    TrainingRoutingModule
  ],
  exports: [],
  entryComponents: [ StopTrainingComponent ]
})
export class TrainingModule {

}
