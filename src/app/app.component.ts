import { Component } from '@angular/core';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './shared/modals/modal.component';
import { AddInvestmentComponent } from './shared/modals/add-investment/add-investment.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    DashboardComponent,
    ModalComponent,
    AddInvestmentComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'financial-portfolio-management';

  showModal = false;
  

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
