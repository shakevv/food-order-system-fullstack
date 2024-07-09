import { Injectable } from '@angular/core';
import { GenericRestService } from '../../common/service/generic-rest.service';
import { IUser } from '../../types/user';
import { PasswordUpdateData } from '../../types/update-password';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericRestService<IUser, string> {
  private readonly RESOURCE = 'users';

  override getResourceUrl(): string {
    return this.RESOURCE;
  }

  updatePassword(updateData: PasswordUpdateData): Observable<any> {
    console.log('update password data: ', updateData);
    return this.http.patch<any>(
      `${this.apiUrl}${this.getResourceUrl()}/${updateData._id}`,
      { password: updateData.password }
    );
  }
}
