import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ShoppingItem} from '../../models/shopping-item/shopping-item.interface';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
/**
 * Generated class for the AddShoppingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-add-shopping', templateUrl: 'add-shopping.html'})
export class AddShoppingPage {
  // Creating a new Object
  shoppingItem = {}  as ShoppingItem;

  shoppingItemRef$ : FirebaseListObservable <ShoppingItem[]>;

  constructor(
    public navCtrl : NavController,
    public navParams : NavParams,
    private database : AngularFireDatabase) {
    this.shoppingItemRef$ = this.database.list('shopping-list');

    /*
    shopping-list
      0
        itemName: 'Pizza',
        itemNumber: 1
      1
        itemName: 'Cheezecake',
        itemNumber: 3
      2
        itemName: 'Pie',
        itemNumber: 12
    */
  }

  addShoppingItem(shoppingItem : ShoppingItem) {
    /*
        Create a new anonymous objectand convert itemNumber to a number.

        Push this to our Firebase database under the 'shopping-list' node.
      */

    this.shoppingItemRef$.push({
        itemName: this.shoppingItem.itemName,
        itemNumber: Number(this.shoppingItem.itemNumber)
    });

    // Reset our shopping item
    this.shoppingItem = {} as ShoppingItem;

    // Navigate the user back to the shopping list page
    /*
      ['ShoppingListPage', 'AddShoppingPage'] pop ==> ['ShoppingListPage']
    */
    this.navCtrl.pop();
  }

}
