import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase'
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class UpdateFileService {
  user: any;
  constructor(private fire:AngularFirestore, private _userService:UserService) {
      this.user = this._userService.getInfo();    
   }

  upload(file: any, id: string) {
    console.log(file);
    const storageRef = firebase.storage().ref();
    console.log(storageRef);
    const uploadImage:firebase.storage.UploadTask = storageRef.child(`bookImages'/${file.name}`).put(file);
    const referenceImage = storageRef.child(`bookImages'/${file.name}`);
    uploadImage.then(
      ()=> {
        referenceImage.getDownloadURL().then(
          (url) => {
          let bookU = this.fire.collection('users').doc(this.user.id).collection('books').doc(id);
          bookU.update(
            {
              image:url
            }
          );
          }
        )
      }
    )

  }
}
