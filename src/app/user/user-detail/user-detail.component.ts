import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RestApiService } from 'src/app/rest-api.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: User;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restApiService: RestApiService
  ) {}

  ngOnInit(): void {
    // get user when `id` param changes
    this.route.paramMap.subscribe((pmap) => this.getUser(pmap.get('id')));
  }

  private getUser(id: string): void {
    // when no id or id===0, create new blank user
    if (!id) {
      this.user = { id: 0, name: '', city: '', website: '' } as User;
      return;
    }

    this.restApiService.getUser(id).subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        this.goToList(); // id not found; navigate to list
      }
    });
  }

  goToList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
