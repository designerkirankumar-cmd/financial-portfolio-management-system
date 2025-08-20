import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { InvestmentService } from './app/core/services/investment.service';

bootstrapApplication(AppComponent,{
  providers: [
    provideHttpClient(),
    InvestmentService  
  ]
})
  .catch((err) => console.error(err));
