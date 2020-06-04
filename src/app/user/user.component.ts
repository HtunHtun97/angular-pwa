import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private restApiService: RestApiService,
    private router: Router) {}

  ngOnInit(): void {
    this.restApiService.getUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource<User>(res);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

  onUserClick(id: number) {
    this.router.navigate(['../users', id]);
  }
}
