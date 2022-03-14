import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { IPost } from 'src/app/interfaces/post.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  selectedFile: any;
  postText: string;
  posts: IPost[] = [];

  constructor(
    private _userSrvc: UserService,
    private _router: Router,
    private _storage: AngularFireStorage,
    private _postSrvc: PostService

  ) { }

  ngOnInit(): void {
    if (!this._userSrvc.getLoggedInUser()) {
      this._router.navigate(['/login'])
    }

    this._postSrvc.getPosts()
      .then((res: any) => this.posts = res)
      .catch(console.log)
  }

  postSchema: IPost = {
    username: '',
    imageUrl: '',
    text: '',
    likes: [],
    comments: [
      {
        username: '',
        content: ''
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
        .then((imageUrl: any) => {
          let postObj: IPost = {
            username: this._userSrvc.getLoggedInUser()?.username,
            text: this.postText,
            imageUrl: imageUrl,
            likes: [],
            comments: []
          };
          this.posts.push(postObj);
          this._postSrvc.saveNewPost(postObj)
            .then(console.log)
            .catch(console.log)
        })
        .catch(console.log)
  }



  // hasLiked(postId){
  //   const post = this.posts.find(x => x.id === Number(postId));
  //   const user = this._userSrvc.getLoggedInUser();
  //   const alreadyLiked = post?.likes.indexOf(user?.id)
  // }

  likePost(postId: any) {
    const post = this.posts.find(x => x.id === Number(postId));
    const user = this._userSrvc.getLoggedInUser();
    const alreadyLiked = post?.likes.indexOf(user?.id)

    if (user) {
      if (alreadyLiked == -1) {
        post?.likes.push(user.id);
      }
      else {
        post?.likes.splice(Number(alreadyLiked), 1);
      }
    }

    if (post)
      this._postSrvc.updatePost(post)
        .then(console.log)
        .catch(console.log)
  }



}
