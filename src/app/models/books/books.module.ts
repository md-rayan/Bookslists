import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from '../../components/books/components/book-list/book-list.component';
import { BookCardComponent } from '../../components/books/components/book-card/book-card.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: BookListComponent }];

@NgModule({
  declarations: [BookListComponent, BookCardComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ],
})
export class BooksModule {}