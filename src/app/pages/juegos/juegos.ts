import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Juego {
  id: string; titulo: string; descripcion: string;
  icono: string; color: string; nivel: string; jugadores: string;
}
interface CartaMemoria {
  id: number; emoji: string; volteada: boolean; emparejada: boolean;
}
interface ColorPregunta {
  nombre: string; hex: string; opciones: string[];
}

@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juegos.html',
  styleUrl: './juegos.css'
})
export class JuegosComponent implements OnInit, OnDestroy {

  constructor(private cdr: ChangeDetectorRef) {}

  juegoActivo: string | null = null;

  juegos: Juego[] = [
    { id: 'memoria', titulo: 'Memoria', descripcion: 'Encuentra las parejas de tarjetas y entrena tu memoria.', icono: '🧠', color: 'morado', nivel: 'Fácil', jugadores: '1-2 jugadores' },
    { id: 'colores', titulo: 'Colores', descripcion: 'Aprende y reconoce los colores con ejercicios divertidos.', icono: '🎨', color: 'azul', nivel: 'Fácil', jugadores: '1 jugador' },
    { id: 'rompecabezas', titulo: 'Rompecabezas', descripcion: 'Arma figuras y desarrolla tu pensamiento espacial.', icono: '🧩', color: 'verde', nivel: 'Medio', jugadores: '1-4 jugadores' },
    { id: 'asociacion', titulo: 'Asociación', descripcion: 'Relaciona conceptos y refuerza tu aprendizaje.', icono: '🔗', color: 'naranja', nivel: 'Medio', jugadores: '1-2 jugadores' }
  ];

  filtroActivo: string = 'todos';
  get juegosFiltrados(): Juego[] {
    if (this.filtroActivo === 'todos') return this.juegos;
    return this.juegos.filter(j => j.nivel.toLowerCase() === this.filtroActivo);
  }
  setFiltro(filtro: string): void { this.filtroActivo = filtro; }
  abrirJuego(id: string): void {
    this.juegoActivo = id;
    if (id === 'memoria') this.iniciarMemoria();
    if (id === 'colores') this.iniciarColores();
    if (id === 'rompecabezas') this.iniciarRompecabezas();
    if (id === 'asociacion') this.iniciarAsociacion();
  }
  cerrarJuego(): void { this.juegoActivo = null; this.limpiarTimer(); }
  trackById(_: number, j: Juego): string { return j.id; }
  ngOnInit(): void {}
  ngOnDestroy(): void { this.limpiarTimer(); }

  // MEMORIA
  cartasMemoria: CartaMemoria[] = [];
  cartasVolteadas: CartaMemoria[] = [];
  parejas = 0; intentos = 0;
  memoriaCompleto = false; memoriaBloquedo = false;
  private timerRef: any = null;
  private emojisMemoria = ['🦁','🐬','🦊','🐸','🦋','🌟','🍕','🎸'];

  iniciarMemoria(): void {
    this.parejas = 0; this.intentos = 0;
    this.memoriaCompleto = false; this.memoriaBloquedo = false;
    this.cartasVolteadas = [];
    const doble = [...this.emojisMemoria, ...this.emojisMemoria];
    this.cartasMemoria = this.mezclar(doble).map((emoji, i) => ({ id: i, emoji, volteada: false, emparejada: false }));
  }
  voltearCarta(carta: CartaMemoria): void {
    if (this.memoriaBloquedo || carta.volteada || carta.emparejada) return;
    carta.volteada = true;
    this.cartasVolteadas.push(carta);
    if (this.cartasVolteadas.length === 2) {
      this.intentos++; this.memoriaBloquedo = true;
      const [a, b] = this.cartasVolteadas;
      if (a.emoji === b.emoji && a.id !== b.id) {
        a.emparejada = true; b.emparejada = true;
        this.parejas++; this.cartasVolteadas = []; this.memoriaBloquedo = false;
        if (this.parejas === this.emojisMemoria.length) this.memoriaCompleto = true;
      } else {
        this.timerRef = setTimeout(() => {
          a.volteada = false; b.volteada = false;
          this.cartasVolteadas = []; this.memoriaBloquedo = false;
          this.cdr.detectChanges();
        }, 1000);
      }
    }
  }

  // COLORES 
  colorPreguntas: ColorPregunta[] = [
    { nombre: 'Rojo',     hex: '#e74c3c', opciones: ['Azul','Rojo','Verde','Amarillo'] },
    { nombre: 'Azul',     hex: '#3498db', opciones: ['Morado','Azul','Naranja','Rosa'] },
    { nombre: 'Verde',    hex: '#2ecc71', opciones: ['Verde','Café','Gris','Negro'] },
    { nombre: 'Amarillo', hex: '#f1c40f', opciones: ['Blanco','Rosado','Amarillo','Celeste'] },
    { nombre: 'Morado',   hex: '#9b59b6', opciones: ['Morado','Verde','Azul','Rojo'] },
    { nombre: 'Naranja',  hex: '#e67e22', opciones: ['Amarillo','Rojo','Naranja','Rosa'] },
    { nombre: 'Rosa',     hex: '#e91e63', opciones: ['Rojo','Rosa','Morado','Naranja'] },
    { nombre: 'Celeste',  hex: '#00bcd4', opciones: ['Verde','Azul','Celeste','Gris'] },
  ];

  colorEstado = {
    index: 0,
    puntaje: 0,
    respuesta: null as string | null,
    correcto: null as boolean | null,
    finalizado: false,
    total: 0,
    pregunta: null as ColorPregunta | null
  };

  iniciarColores(): void {
    const preguntas = this.mezclar([...this.colorPreguntas]);
    this.colorPreguntas = preguntas;
    this.colorEstado = {
      index: 0,
      puntaje: 0,
      respuesta: null,
      correcto: null,
      finalizado: false,
      total: preguntas.length,
      pregunta: { ...preguntas[0] }
    };
    this.cdr.detectChanges();
  }

  responderColor(opcion: string): void {
    if (this.colorEstado.respuesta !== null) return;
    const correcto = opcion === this.colorEstado.pregunta!.nombre;
    this.colorEstado = {
      ...this.colorEstado,
      respuesta: opcion,
      correcto,
      puntaje: correcto ? this.colorEstado.puntaje + 1 : this.colorEstado.puntaje
    };
    this.cdr.detectChanges();

    setTimeout(() => {
      const nextIndex = this.colorEstado.index + 1;
      const finalizado = nextIndex >= this.colorPreguntas.length;
      this.colorEstado = {
        ...this.colorEstado,
        index: nextIndex,
        respuesta: null,
        correcto: null,
        finalizado,
        pregunta: finalizado ? null : { ...this.colorPreguntas[nextIndex] }
      };
      this.cdr.detectChanges();
    }, 1000);
  }

  // ROMPECABEZAS
  tablero: (number | null)[] = [];
  movimientos = 0; puzzleCompleto = false; tamano = 4;

  iniciarRompecabezas(): void {
    this.movimientos = 0; this.puzzleCompleto = false;
    let t: (number | null)[] = Array.from({ length: 15 }, (_, i) => i + 1);
    t.push(null);
    for (let i = 0; i < 200; i++) {
      const vacia = t.indexOf(null);
      const vecinos = this.vecinosValidos(vacia, this.tamano);
      const elegido = vecinos[Math.floor(Math.random() * vecinos.length)];
      t[vacia] = t[elegido]; t[elegido] = null;
    }
    this.tablero = [...t];
  }
  vecinosValidos(pos: number, n: number): number[] {
    const v: number[] = [];
    const f = Math.floor(pos / n), c = pos % n;
    if (f > 0) v.push(pos - n);
    if (f < n - 1) v.push(pos + n);
    if (c > 0) v.push(pos - 1);
    if (c < n - 1) v.push(pos + 1);
    return v;
  }
  moverPieza(i: number): void {
    if (this.puzzleCompleto) return;
    const vacia = this.tablero.indexOf(null);
    if (this.vecinosValidos(vacia, this.tamano).includes(i)) {
      const nuevo = [...this.tablero];
      nuevo[vacia] = nuevo[i]; nuevo[i] = null;
      this.tablero = nuevo;
      this.movimientos++;
      this.puzzleCompleto = this.tablero.every((v, idx) => idx === 15 ? v === null : v === idx + 1);
      this.cdr.detectChanges();
    }
  }
  esCorrecta(i: number): boolean {
    const v = this.tablero[i]; return v !== null && v === i + 1;
  }

  // ASOCIACION 
  paresAsociacion = [
    { id: 1, izquierda: '🐶 Perro',     derecha: 'Ladra'  },
    { id: 2, izquierda: '🐱 Gato',      derecha: 'Maúlla' },
    { id: 3, izquierda: '🐄 Vaca',      derecha: 'Muuu'   },
    { id: 4, izquierda: '🐸 Rana',      derecha: 'Croac'  },
    { id: 5, izquierda: '🦁 León',      derecha: 'Ruge'   },
    { id: 6, izquierda: '🐍 Serpiente', derecha: 'Sisea'  },
  ];
  columnaIzq: { id: number; texto: string; seleccionado: boolean; emparejado: boolean }[] = [];
  columnaDer: { id: number; texto: string; seleccionado: boolean; emparejado: boolean }[] = [];
  seleccionIzq: number | null = null;
  seleccionDer: number | null = null;
  asociacionPuntaje = 0; asociacionError = false; asociacionCompleto = false;

  iniciarAsociacion(): void {
    const pares = this.mezclar([...this.paresAsociacion]);
    this.columnaIzq = pares.map(p => ({ id: p.id, texto: p.izquierda, seleccionado: false, emparejado: false }));
    this.columnaDer = this.mezclar(pares.map(p => ({ id: p.id, texto: p.derecha, seleccionado: false, emparejado: false })));
    this.seleccionIzq = null; this.seleccionDer = null;
    this.asociacionPuntaje = 0; this.asociacionError = false; this.asociacionCompleto = false;
  }
  seleccionarIzq(item: any): void {
    if (item.emparejado) return;
    this.columnaIzq.forEach(i => i.seleccionado = false);
    item.seleccionado = true; this.seleccionIzq = item.id;
    this.asociacionError = false; this.verificarAsociacion();
  }
  seleccionarDer(item: any): void {
    if (item.emparejado) return;
    this.columnaDer.forEach(i => i.seleccionado = false);
    item.seleccionado = true; this.seleccionDer = item.id;
    this.asociacionError = false; this.verificarAsociacion();
  }
  verificarAsociacion(): void {
    if (this.seleccionIzq === null || this.seleccionDer === null) return;
    if (this.seleccionIzq === this.seleccionDer) {
      this.columnaIzq.find(i => i.id === this.seleccionIzq)!.emparejado = true;
      this.columnaIzq.find(i => i.id === this.seleccionIzq)!.seleccionado = false;
      this.columnaDer.find(i => i.id === this.seleccionDer)!.emparejado = true;
      this.columnaDer.find(i => i.id === this.seleccionDer)!.seleccionado = false;
      this.asociacionPuntaje++;
      this.seleccionIzq = null; this.seleccionDer = null;
      if (this.asociacionPuntaje === this.paresAsociacion.length) this.asociacionCompleto = true;
    } else {
      this.asociacionError = true;
      this.timerRef = setTimeout(() => {
        this.columnaIzq.forEach(i => i.seleccionado = false);
        this.columnaDer.forEach(i => i.seleccionado = false);
        this.seleccionIzq = null; this.seleccionDer = null; this.asociacionError = false;
        this.cdr.detectChanges();
      }, 800);
    }
  }

  private mezclar<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  private limpiarTimer(): void {
    if (this.timerRef) { clearTimeout(this.timerRef); this.timerRef = null; }
  }
}
