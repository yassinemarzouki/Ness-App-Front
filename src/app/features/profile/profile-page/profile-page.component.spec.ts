import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageComponent } from './profile-page.component';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle follow status', () => {
    const initialStatus = component.userProfile.isFollowing;
    component.toggleFollow();
    expect(component.userProfile.isFollowing).toBe(!initialStatus);
  });

  it('should format numbers correctly', () => {
    expect(component.formatNumber(1500)).toBe('1.5K');
    expect(component.formatNumber(1500000)).toBe('1.5M');
    expect(component.formatNumber(500)).toBe('500');
  });

  it('should return correct videos for each tab', () => {
    component.activeTab = 'videos';
    expect(component.getDisplayVideos()).toEqual(component.videos);

    component.activeTab = 'likes';
    expect(component.getDisplayVideos()).toEqual(component.likedVideos);

    component.activeTab = 'saved';
    expect(component.getDisplayVideos().length).toBeLessThanOrEqual(3);
  });
});
