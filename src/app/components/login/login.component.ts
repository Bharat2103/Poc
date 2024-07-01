import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  response:any={
    "message": "Login successful",
    "name": "Shiv Kumar",
    "email": "sk@gmail.com",
    "role": "Admin",
    "permissions": [
      {
        "id": "1",
        "name": "User Management"
      },
      {
        "id": "10",
        "name": "Edit Schedule"
      },
      {
        "id": "11",
        "name": "Journal Management"
      },
      {
        "id": "2",
        "name": "Start Workflow"
      },
      {
        "id": "3",
        "name": "Cylinder Management"
      },
      {
        "id": "4",
        "name": "Document Store Read"
      },
      {
        "id": "5",
        "name": "Document Store Write"
      },
      {
        "id": "6",
        "name": "Generate Report"
      },
      {
        "id": "7",
        "name": "Edit Dataset"
      },
      {
        "id": "8",
        "name": "Edit Control Chart Parameters"
      },
      {
        "id": "9",
        "name": "Edit Workflow Parameters"
      }
    ],
    "authenticationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2hpdiBLdW1hciIsImVtYWlsIjoic2tAZ21haWwuY29tIiwidXNlcklkIjoiYzA2ODU4YjMtZjAzNC00ODU0LTk0NmQtMzYxYTgxOWU2OWYzIiwicm9sZSI6IkFkbWluIiwiZXhwIjoxNzE5NDg0MDA3LCJpc3MiOiJTZWN1cmVBcGkiLCJhdWQiOiJTZWN1cmVBcGlVc2VyIn0.OPBe0vrVgWUwTTKhLzAj1zAW593QLBCcJxx7FGVrhnA",
    "authenticationTokenExpiresOn": "2024-06-27T10:26:47Z",
    "refreshToken": "l02zIfF2dUlAY7j326RfzIoVkzRHKJR09ZukiDo3kLI=",
    "refreshTokenExpiresOn": "2024-07-07T10:11:47.9894521Z"
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

  login() {
    this.http.post('https://172.16.2.212:1011/login', { email: this.email, Password: this.password })
      .subscribe((response: any) => {
        this.authService.login(response);
      });
    this.authService.login(this.response)
  }
}
