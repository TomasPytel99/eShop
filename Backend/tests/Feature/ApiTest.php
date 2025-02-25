<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApiTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
    public function it_returns_user_data()
    {
        $response = $this->getJson('/api/user');

        $response->assertStatus(200);
        $response->assertJson([
            'name' => 'John Doe',
        ]);
    }
}
