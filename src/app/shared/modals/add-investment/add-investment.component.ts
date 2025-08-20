import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Investment } from '../../../core/models/investment.model';
import { CurrencyFormatPipe } from '../../../core/pipes/currency-format.pipe';
import { InvestmentService } from '../../../core/services/investment.service';

@Component({
  selector: 'app-add-investment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyFormatPipe],
  templateUrl: './add-investment.component.html',
  styleUrl: './add-investment.component.scss'
})
export class AddInvestmentComponent implements OnInit {
  investmentForm!: FormGroup;
  formSubmitted = false;
  submissionSuccess = false;

  reviewInvestment: Investment | null = null;

  @Output() investmentAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private investmentService: InvestmentService) { }

  ngOnInit(): void {
    this.investmentForm = this.fb.group({
      assetType: ['', Validators.required],
      assetName: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(0.01)]],
      purchasePrice: [null, [Validators.required, Validators.min(0.01)]],
      purchaseDate: ['', Validators.required]
    });
  }

  onReview(): void {
    this.formSubmitted = true;
    if (this.investmentForm.valid) {
      this.reviewInvestment = {
        id: Math.random().toString(), 
        ...this.investmentForm.value,
        purchaseDate: new Date(this.investmentForm.value.purchaseDate),
        currentPrice: this.investmentForm.value.purchasePrice, 
      };
    } else {
      console.error('Form is invalid. Please check the inputs.');
    }
  }


  onSubmit(): void {
    if (this.reviewInvestment) {
      this.investmentService.addInvestment(this.reviewInvestment);
      this.submissionSuccess = true;
      this.investmentForm.reset();
      this.reviewInvestment = null;
      this.formSubmitted = false;

      setTimeout(() => {
        this.submissionSuccess = false;
        this.investmentAdded.emit();
      }, 1000);
    }
  }

  onCancelReview(): void {
    this.reviewInvestment = null;
    this.formSubmitted = false;
  }
}
