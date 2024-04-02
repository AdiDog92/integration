<?php

print_r($_POST) ;
return;
class SendForm
{
    const API_KEY = 'https://kiselevgroup.bitrix24.ru/rest/5625/sx44e3i9817b34u9/';

    /**
     * @param $request
     * @return void
     */
    public static function init($request)
    {
		switch ($request['formid']) {
			case 'form7080295':
				self::webHookExecuteREST('crm.lead.add', [
					'fields' => [
						'TITLE' => 'Заявка с сайта kiselevgroup.ru',
						// 'NAME' => $request['name'],
						// 'EMAIL' => [
						// 	[
						// 		'VALUE' => $request['email'],
						// 		'VALUE_TYPE' => 'WORK',
						// 	]
						// ],
						'PHONE' => [
							[
								'VALUE' => $request['phone'],
								'VALUE_TYPE' => 'WORK',
							]
						],
					]
				]);
        // echo "true";
        // exit();
				break;
			default:
				// header('HTTP/1.1 403 Forbidden');
				exit();
		}
    }
    /**
     * @param $data
     * @param $title
     * @return void
     */
    private static function writeToLog($data, $title = ''): void
    {
        $log = "\n----------start----------\n";
        $log .= date('Y.m.d G:i:s') . "\n";
        $log .= (strlen($title) > 0 ? $title : 'DEBUG') . "\n";
        $log .= print_r($data, true);
        $log .= "\n-----------end-----------\n";
        file_put_contents(dirname(realpath(__FILE__)) . '/log/' . self::class . '.log', $log, FILE_APPEND);
    }

    /**
     * @param $method
     * @param $params
     * @return mixed
     */
    private static function webHookExecuteREST($method, $params)
    {
        $queryUrl = self::API_KEY . $method . '.json';
        $queryData = http_build_query($params);
        $curl = curl_init($queryUrl);
        curl_setopt_array($curl, array(
            CURLOPT_POST => 1,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_POSTFIELDS => $queryData,
        ));
        $result = curl_exec($curl);
        curl_close($curl);
        // print_r(json_decode($result, true));
        return json_decode($result, true);
    }
}

SendForm::init($_REQUEST);