import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsDataService } from './projects-data.service';

describe('ProjectsDataService', () => {
  let service: ProjectsDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsDataService],
    }).compile();

    service = module.get<ProjectsDataService>(ProjectsDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
