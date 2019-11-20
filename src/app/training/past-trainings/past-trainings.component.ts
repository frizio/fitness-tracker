import { Subscription } from 'rxjs';
import { Exercise } from './../exercise.model';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  private exercisesSubscription: Subscription; 
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  @ViewChild(MatSort, {static: true})
  sort: MatSort;
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;


  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.exercisesSubscription = this.trainingService.finishedExercisesChanged
      .subscribe(
        exercises => this.dataSource.data = exercises
      );
    this.trainingService.fetchCompletedOrCanceledEsercises(); 
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.exercisesSubscription.unsubscribe();
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
