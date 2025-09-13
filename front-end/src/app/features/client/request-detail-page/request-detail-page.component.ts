import { Component, OnInit } from '@angular/core';
import { RequestDescriptionComponent } from "./components/request-description/request-description.component";
import { RequestHistoryComponent } from "./components/request-history/request-history.component";
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../shared/services/request.service';
import { Request } from '../../../shared/models/request';


@Component({
  selector: 'app-request-detail-page',
  standalone: true,
  imports: [RequestDescriptionComponent, RequestHistoryComponent],
  templateUrl: './request-detail-page.component.html',
  styleUrl: './request-detail-page.component.css'
})

export class RequestDetailPageComponent implements OnInit{

  request: Request | undefined

  constructor(
    private route: ActivatedRoute, // parâmetros da rota
    private requestService: RequestService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
        this.request = this.requestService.buscarPorId(Number(id));
    }
  }

}
