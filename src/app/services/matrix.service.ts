import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  constructor() { }

  soma(matrizA: number[][], matrizB: number[][]): number[][] {
    let resultado: number[][] = [];
    for (let i = 0; i < matrizA.length; i++) {
      let linha: number[] = [];
      for (let j = 0; j < matrizA[i].length; j++) {
        linha.push(matrizA[i][j] + matrizB[i][j]);
      }
      resultado.push(linha);
    }
    return resultado;
  }

  multiplicacao(matrizA: number[][], matrizB: number[][]): number[][] {
    let resultado: number[][] = [];
    for (let i = 0; i < matrizA.length; i++) {
      let linha: number[] = [];
      for (let j = 0; j < matrizB[0].length; j++) {
        let soma = 0;
        for (let k = 0; k < matrizA[0].length; k++) {
          soma += matrizA[i][k] * matrizB[k][j];
        }
        linha.push(soma);
      }
      resultado.push(linha);
    }
    return resultado;
  }

  transposta(matriz: number[][]): number[][] {
    let resultado: number[][] = [];
    for (let i = 0; i < matriz[0].length; i++) {
      let linha: number[] = [];
      for (let j = 0; j < matriz.length; j++) {
        linha.push(matriz[j][i]);
      }
      resultado.push(linha);
    }
    return resultado;
  }
}
