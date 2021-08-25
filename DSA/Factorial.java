// n, x - x^n
// 2, 3 - 3^2
// 3 * 3 || 3^4 = 3*3*3*3 

import java.util.Scanner;

public class Factorial {
    public static void main(String[] args) {
        Scanner scn = new Scanner(System.in);
        int n = scn.nextInt();
        printPower(n);
    }

    public static void printPower(int n){
        if(n==0){
            return;
        }
        System.out.print(n);        
        printPower(n-1);
        System.out.print(n);
        printPower(n-1);
        System.out.print(n);
    }
}