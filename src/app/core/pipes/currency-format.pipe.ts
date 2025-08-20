import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: number | null): SafeHtml {
    if (value === null || isNaN(value)) {
      const formattedValue = `0.00`;
      return this.sanitizer.bypassSecurityTrustHtml(`<i class="fa fa-rupee-sign"></i> ${formattedValue}`);
    }
    const formattedValue = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return this.sanitizer.bypassSecurityTrustHtml(`<i class="fa fa-rupee-sign"></i> ${formattedValue}`);
  }
}