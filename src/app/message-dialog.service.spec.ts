import { TestBed, inject } from '@angular/core/testing';

import { MessageDialogService } from './message-dialog.service';

describe('MessageDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageDialogService]
    });
  });

  it('should be created', inject([MessageDialogService], (service: MessageDialogService) => {
    expect(service).toBeTruthy();
  }));
});
