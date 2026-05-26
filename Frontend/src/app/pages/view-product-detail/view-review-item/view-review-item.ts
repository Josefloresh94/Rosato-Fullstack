import { Component, input } from '@angular/core';
import { UserReview } from '../../../models/user-review';
import { ViewPanel } from "../../../directives/view-panel";
import { StarRating } from "../../../components/star-rating/star-rating";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-review-item',
  imports: [ViewPanel, StarRating, DatePipe],
  template: `
    <div appViewPanel>
      <div class="flex items-start gap-4">
        <img
          [src]="review().userImageUrl"
          [alt]="review().userName"
          class="w-10 h-10 rounded-full object-cover"
        >
        <div>
          <h3 class="text-lg font-semibold">{{ review().userName }}</h3>
          <div class="flex items-center mb-1">
            <app-star-rating [rating]="review().rating" />
            <p class="text-sm text-gray-500">{{ review().reviewDate | date: 'MMM d, yyyy'}}</p>
          </div>
          <p class="text-base font-semibold mb-1">{{ review().title }}</p>
          <p class="text-sm text-gray-500">{{review().comment}}</p>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ViewReviewItem {
  review = input.required<UserReview>();
}
