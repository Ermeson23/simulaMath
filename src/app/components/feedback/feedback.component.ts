import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FeedbackService } from '../../services/feedback.service';
import { MessageService } from '../../services/message.service';

import { Doubt } from '../../model/doubt';
import { Feedback } from '../../model/feedback';
import { DoubtService } from '../../services/doubt.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatLabel, ReactiveFormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {

  feedback = new FormControl('', [Validators.minLength(10), Validators.maxLength(500)]);
  doubt = new FormControl('', [Validators.minLength(10), Validators.maxLength(500)]);

  constructor(
    private doubtService: DoubtService,
    private feedbackService: FeedbackService,
    private messageService: MessageService
  ) { }

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
    const doubtData: Doubt = {
      doubt: this.doubt.value || '',
    };

    this.doubtService.takeDoubt(doubtData).subscribe({
      next: (response: any) => {
        console.log(doubtData)
        this.messageService.message('Dúvida sumetida com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao sumeter Dúvida.', err);

        let customMessage = 'Erro ao sumeter Dúvida.';

        if (err.error?.message) {
          customMessage = 'Erro ao sumeter Dúvida.';
        }

        this.messageService.message(customMessage);
      }
    });
  }
}