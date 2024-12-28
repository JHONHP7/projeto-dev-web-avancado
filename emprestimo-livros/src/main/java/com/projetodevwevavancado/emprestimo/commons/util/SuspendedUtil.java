package com.projetodevwevavancado.emprestimo.commons.util;

import java.util.Calendar;
import java.util.Date;

public class SuspendedUtil {

    /**
     * Verifica se um usuário está suspenso com base na data de suspensão.
     *
     * @param suspendedUntil A data até a qual o usuário está suspenso.
     * @return true se o usuário ainda estiver suspenso, false caso contrário.
     */
    public static boolean isSuspended(Date suspendedUntil) {
        return suspendedUntil != null && new Date().before(suspendedUntil);
    }

    /**
     * Calcula a data de suspensão com base no número de dias fornecidos.
     *
     * @param days O número de dias de suspensão.
     * @return A data até a qual o usuário estará suspenso.
     */
    public static Date suspendForDays(int days) {
        // Cria uma instância do calendário e ajusta a data com base nos dias.
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, days);

        // Zera as horas, minutos, segundos e milissegundos da data final
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        return calendar.getTime();
    }

}
