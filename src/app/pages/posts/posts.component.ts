import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { IPost } from 'src/app/interfaces/post.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  selectedFile: any;

  constructor(
    private _userSrvc: UserService,
    private _router: Router,
    private _storage: AngularFireStorage

  ) { }

  ngOnInit(): void {
    if (!this._userSrvc.getLoggedInUser()) {
      this._router.navigate(['/login'])
    }
  }

  postSchema: IPost = {
    username: '',
    imageUrl: '',
    text: '',
    likes: [],
    comments: [
      {
        username: '',
        comment: ''
      }
    ]
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }

  uploadImage() {
    return new Promise(
      (resolve, reject) => {
        let n = Date.now();
        const file = this.selectedFile;
        const filePath = `images/${n}`;
        const fileRef = this._storage.ref(filePath);
        const task = this._storage.upload(`images/${n}`, file);
        task.snapshotChanges().pipe(
          finalize(() => {
            let imageURL = fileRef.getDownloadURL();
            imageURL.subscribe((url: any) => {
              if (url) {
                console.log(url);
                resolve(url);
              }
            });
          })
        ).subscribe((url) => {
          if (url) console.log(url)
        })
      }
    )
  }

  newPost() {
    if (this.selectedFile)
      this.uploadImage()
        .then(imageUrl => console.log(imageUrl))
        .catch(console.log)
  }

}
