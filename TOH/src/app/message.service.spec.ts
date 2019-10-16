import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));

  it('should have no messages initially', () => {
    let msgSvc: MessageService = TestBed.get(MessageService);
    expect(msgSvc.messages.length).toBe(0);
  });

  it('should add a message', () => {
    let msgSvc: MessageService = TestBed.get(MessageService);

    expect(msgSvc.messages.length).toBe(0);

    const msg = 'Added new message';
    msgSvc.add(msg);

    expect(msgSvc.messages.length).toBe(1);
    expect(msgSvc.messages[0]).toEqual(msg);
  })

  it('should clear all messages on clear call', () => {
    let msgSvc: MessageService = TestBed.get(MessageService);
    const msg = 'Added new message';
    msgSvc.add(msg);
    expect(msgSvc.messages.length).toBe(1);
    msgSvc.clear();
    expect(msgSvc.messages.length).toBeFalsy();
    expect(msgSvc.messages.length).toBe(0);
  })
});
