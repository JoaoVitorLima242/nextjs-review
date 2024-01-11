import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let coursesService: CoursesService;

  beforeEach(async () => {
    coursesService = new CoursesService();
  });

  it('should be defined', () => {
    expect(coursesService).toBeDefined();
  });
});
