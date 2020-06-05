import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { RestApiService } from '../rest-api.service';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User[];
  col: string[] = ['id', 'name', 'city', 'website'];
  dataSource = new MatTableDataSource<User>(this.user);

  constructor(
    private restApiService: RestApiService,
    private router: Router) {}

  ngOnInit(): void {
    this.restApiService.getUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource<User>(res);
    })
  }

  onUserClick(id: number) {
    this.router.navigate(['../users', id]);
  }
}
