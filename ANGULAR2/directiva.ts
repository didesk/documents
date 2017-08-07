import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {
  

  constructor(private el: ElementRef ) {
    console.log('directiva llamada');
    // el.nativeElement.style.backgroundColor = 'yellow';
    el.nativeElement.style.marginTop = '40px';
  }
  
  @Input('appResaltado') nuevoColor: string;

  //para poder estar pendiente de lo que sucede en el elemento devemos incluir HostListener y se usa así:

  @HostListener('mouseenter') mouseDentro () {
    this.resaltar( this.nuevoColor || 'yellow');
    // this.el.nativeElement.style.backgroundColor = 'yellow';
  }
  @HostListener('mouseleave') nousmouseFuera () {
    // this.el.nativeElement.style.backgroundColor = null;
    this.resaltar( null );
  }

  private resaltar( color:string ){
    this.el.nativeElement.style.backgroundColor = color;
  }


}



// TESTING DIRECTIVA
import { ResaltadoDirective } from './resaltado.directive';

describe('ResaltadoDirective', () => {
  it('should create an instance', () => {
    const directive = new ResaltadoDirective();
    expect(directive).toBeTruthy();
  });
});

