import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {AngularFireModule} from 'angularfire2';
import {MyApp} from './app.component';
import {ShoppingListPage} from '../pages/shopping-list/shopping-list';
import {AddShoppingPage} from '../pages/add-shopping/add-shopping';
import {FIREBASE_CREDENTIALS} from './firebase.credentials';
import {AngularFireDatabaseModule} from 'angularfire2/database-deprecated';

@NgModule({
  declarations: [
    MyApp, ShoppingListPage, AddShoppingPage
  ],
  imports: [
    BrowserModule, IonicModule.forRoot(MyApp),
    //Initialise Angularfire with credentials from the Firebase dashboard
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    // Import the AngularFireDatabaseModule to use database interactions
    AngularFireDatabaseModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, ShoppingListPage, AddShoppingPage
  ],
  providers: [
    StatusBar,
      SplashScreen, {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
