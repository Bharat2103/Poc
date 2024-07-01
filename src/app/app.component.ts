import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [HttpClientModule, RouterModule, LoginComponent]
})
export class AppComponent {
  title = 'auth-example';
}