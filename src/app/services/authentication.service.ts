import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
 
@Injectable()
export class AuthenticateService {
 
  constructor(){}
 
  registerUser( user ){

    let email = user.email
    let userName = "New User"

   return new Promise<any>( (resolve, reject ) => {
     firebase.auth().createUserWithEmailAndPassword( user.email, user.password)
     .then(( newUserCredential: firebase.auth.UserCredential ) => {
        firebase
            .firestore()
            .doc( `/userProfile/${newUserCredential.user.uid}` )
      .set({ email, userName })
    })

     .then(
       res => resolve( res ),
       err => reject( err ))
   })
  }
 
  loginUser( user ){
   return new Promise<any>(( resolve, reject ) => {
     firebase.auth().signInWithEmailAndPassword( user.email, user.password )
     .then(
       res => resolve( res ),
       err => reject( err ))
   })
  }
 
  logoutUser(){
    return new Promise(( resolve, reject ) => {
      if( firebase.auth().currentUser ){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch(( error ) => {
          reject();
        });
      }
    })
  }
 
  forgotPassword( email : string ){
    return new Promise<any>(( resolve, reject ) => {
      firebase.auth().sendPasswordResetEmail( email )
      .then(
        res => resolve( res ),
        err => reject( err ))
    })
   }


  

  userDetails(){
    return firebase.auth().currentUser;
  }
}