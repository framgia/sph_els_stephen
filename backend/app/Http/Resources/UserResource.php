<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource {
    public function toArray($request) {
        $jsonArr = [];
        foreach ($this->jsonKeyMap as $k => $v) {
            $jsonArr[$v] = $this->$k;
        }
        return $jsonArr;
    }
}
