import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule,
         MatDatepickerModule, MatNativeDateModule } from '@angular/material';


@NgModule({
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDatepickerModule],
  exports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule]
})
export class MaterialModule { }
