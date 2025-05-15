import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make a GET request to the correct URL', () => {
    service.getBooks().subscribe();
    const req = httpMock.expectOne('https://www.googleapis.com/books/v1/volumes?q=fouling&maxResults=12&startIndex=0');
    expect(req.request.method).toBe('GET');
    req.flush({ items: [] });
  });

  it('should return an empty array when API returns no items', (done) => {
    service.getBooks().subscribe((books) => {
      expect(books).toEqual([]);
      done();
    });

    const req = httpMock.expectOne(service['apiUrl']);
    req.flush({});
  });

  it('should throw an error when the API call fails', (done) => {
    service.getBooks().subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe('Failed to load books');
        done();
      }
    });

    const req = httpMock.expectOne(service['apiUrl']);
    req.error(new ErrorEvent('Network error'));
  });
});
