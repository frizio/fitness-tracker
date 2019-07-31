import { Exercise } from './../exercise.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  @ViewChild(MatSort, {static: true})
  sort: MatSort;


  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedOrCanceledEsercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
