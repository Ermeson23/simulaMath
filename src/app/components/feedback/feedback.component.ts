import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';

import { Feedback } from '../../model/feedback';
import { FeedbackService } from '../../services/feedback.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [MatFormField, MatLabel, ReactiveFormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {

  feedback = new FormControl('', [Validators.minLength(10), Validators.maxLength(500)]);
  doubt = new FormControl('', [Validators.minLength(10), Validators.maxLength(500)]);

  constructor(
    private feedbackService: FeedbackService, 
    private messageService: MessageService
  ) {}

  onFeedback() {
    const feedbackData: Feedback = {
      message: this.feedback.value || '',
    };

    this.feedbackService.giveFeedback(feedbackData).subscribe({
      next: (response: any) => {
        console.log(feedbackData)
          this.messageService.message('Feedback enviado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao enviar Feedback.', err);

        let customMessage = 'Erro ao enviar Feedback.';

        if (err.error?.message) {
          customMessage = 'Erro ao enviar Feedback.';
        }

        this.messageService.message(customMessage);
      }
    });

  }

  onDoubt() {

  }

}
